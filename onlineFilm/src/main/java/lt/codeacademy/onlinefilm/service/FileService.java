package lt.codeacademy.onlinefilm.service;

import lombok.extern.slf4j.Slf4j;
import lt.codeacademy.onlinefilm.entity.FileEntity;
import lt.codeacademy.onlinefilm.exception.FileException;
import lt.codeacademy.onlinefilm.repository.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

@Slf4j
@Service
public class FileService {

    private static final long MAX_FILE_SIZE = 1000000000;
    private final Path location;
    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;

        location = Paths.get("./files").toAbsolutePath().normalize();
        createDirectory();
    }

    private void createDirectory() {
        try {
            if (!Files.exists(location)) {
                Files.createDirectory(location);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new FileException("Cannot create directory");
        }
    }

    private void validateFile(MultipartFile multipartFile) {
        if (multipartFile.getSize() > MAX_FILE_SIZE) {
            throw new FileException(String.format("FileEntity is %s is to big, must be less then %s B", multipartFile.getSize(), MAX_FILE_SIZE));
        }
    }

    private void saveFileInFileSystem(String fileName, MultipartFile multipartFile) {
        try {
            Path fileLocation = location.resolve(fileName);
            Files.copy(multipartFile.getInputStream(), fileLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new FileException("Cannot save file");
        }
    }

    private String getUniqueFileName(MultipartFile multipartFile) {
        return String.format("%s", multipartFile.getOriginalFilename());
    }

    public void saveFileInFileSystemAndMetadataInDb(MultipartFile multipartFile) {
        validateFile(multipartFile);

        FileEntity file = new FileEntity(multipartFile.getOriginalFilename(), multipartFile.getContentType());
        file = fileRepository.save(file);

        saveFileInFileSystem(file.getId().toString(), multipartFile);
    }
}
