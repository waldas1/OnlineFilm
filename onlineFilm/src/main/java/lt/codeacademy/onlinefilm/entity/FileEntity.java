package lt.codeacademy.onlinefilm.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String name;
    private String mediaType;
    @CreationTimestamp
    private LocalDateTime timestamp;
    @Lob
    private byte[] bytes;

    public FileEntity(String name, String mediaType) {
        this(name, mediaType, null);
    }

    public FileEntity(String name, String mediaType, byte[] bytes) {
        this.name = name;
        this.mediaType = mediaType;
        this.bytes = bytes;
    }
}
