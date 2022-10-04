package lt.codeacademy.onlinefilm.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import lt.codeacademy.onlinefilm.dto.Role;
import lt.codeacademy.onlinefilm.dto.User;
import lt.codeacademy.onlinefilm.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class JwtService {

    private final long tokenValidTimeMs;
    private final byte[] secretKey;

    public JwtService(@Value("${security.jwt.secret.key}") byte[] secretKey,
                      @Value("#{${security.jwt.valid.token.min} * 60000}") long tokenValidTimeMs) {
        this.secretKey = secretKey;
        this.tokenValidTimeMs = tokenValidTimeMs;
    }

    public String generateToken(User user) {
        Date date = new Date();
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setAudience("onlineFilm-ui")
                .setIssuer("onlineFilm-api")
                .setSubject(user.getUsername())
                .setExpiration(new Date(date.getTime() + tokenValidTimeMs))
                .setIssuedAt(date)
                .claim("roles", user.getRoles().stream().map(Role::getAuthority).toList())
                .signWith(Keys.hmacShaKeyFor(secretKey), SignatureAlgorithm.HS512)
                .compact();
    }

    public Authentication parseToken(String token) {
        try {
            JwtParser jwtParser = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build();

            Jws<Claims> claimsJws = jwtParser.parseClaimsJws(token);
            Claims body = claimsJws.getBody();

            String userName = body.getSubject();
            List<SimpleGrantedAuthority> roles = ((List<String>) body.get("roles")).stream().map(SimpleGrantedAuthority::new).toList();

            return new UsernamePasswordAuthenticationToken(userName, null, roles);
        } catch(Exception e) {
            throw new InvalidTokenException();
        }
    }

    //documentation -> https://github.com/jwtk/jjwt#jws-key-create-secret
    private String generateJwtSecretKey() {
        try {
            SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
            return Encoders.BASE64.encode(key.getEncoded());
        }
        catch(Exception e) {
            throw new IllegalArgumentException(e);
        }
    }
}
