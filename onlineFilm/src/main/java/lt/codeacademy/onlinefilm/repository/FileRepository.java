package lt.codeacademy.onlinefilm.repository;

import lt.codeacademy.onlinefilm.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FileRepository extends JpaRepository<FileEntity, UUID> {
}
