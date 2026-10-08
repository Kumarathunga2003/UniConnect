package com.uniconnect.backend.service;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
@Service
public class CvStorageService {
    private final StudentRepository students; private final Path root;
    public CvStorageService(StudentRepository students, @Value("${app.upload-dir:uploads}") String uploadDir) { this.students = students; this.root = Paths.get(uploadDir, "cvs").toAbsolutePath().normalize(); }
    @Transactional public Student upload(String email, MultipartFile file) {
        if (file.isEmpty()) throw new IllegalArgumentException("Please choose a PDF file");
        if (file.getSize() > 5 * 1024 * 1024) throw new IllegalArgumentException("CV must be smaller than 5 MB");
        String original = file.getOriginalFilename() == null ? "cv.pdf" : file.getOriginalFilename();
        original = original.replace('\\', '/');
        original = original.substring(original.lastIndexOf('/') + 1)
                .replaceAll("[\\r\\n\"]", "_");
        if (!original.toLowerCase().endsWith(".pdf")) throw new IllegalArgumentException("Only PDF files are allowed");
        Student student = students.findByUserEmail(email).orElseThrow(() -> new IllegalArgumentException("Create your student profile before uploading a CV"));
        try { Files.createDirectories(root); if (student.getCvFileName() != null) Files.deleteIfExists(root.resolve(student.getCvFileName())); String name = UUID.randomUUID() + ".pdf"; file.transferTo(root.resolve(name)); student.setCvFileName(name); student.setCvOriginalName(original); return students.save(student); }
        catch (Exception exception) { throw new IllegalArgumentException("Unable to store CV"); }
    }
    public Student student(String email) { return students.findByUserEmail(email).orElseThrow(() -> new IllegalArgumentException("Student profile not found")); }
    public Resource load(Student student) { if (student.getCvFileName() == null) throw new IllegalArgumentException("CV not found"); try { Resource resource = new UrlResource(root.resolve(student.getCvFileName()).toUri()); if (!resource.exists()) throw new IllegalArgumentException("CV file not found"); return resource; } catch (IllegalArgumentException e) { throw e; } catch (Exception e) { throw new IllegalArgumentException("Unable to read CV"); } }
    @Transactional public void remove(String email) { Student student = student(email); try { if (student.getCvFileName() != null) Files.deleteIfExists(root.resolve(student.getCvFileName())); } catch (Exception ignored) {} student.setCvFileName(null); student.setCvOriginalName(null); students.save(student); }
}
