package com.Kursat.springbootecommerce.resource;


import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.swing.plaf.synth.SynthTextAreaUI;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/file")
@CrossOrigin("*")
public class FileResource {

    @Value("${app.upload.dir:${user.dir}}")
    public String uploadDir;
    @PostMapping(value = "/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            UUID randomUUID=UUID.randomUUID();
            InputStream ty=file.getInputStream();
            String abc=convertInputStreamToString(ty);
            String imageData = abc;
            String base64Data = imageData.split(",")[1];
            byte[] decodedBytes = Base64.getDecoder().decode(base64Data);
            ByteArrayInputStream bis = new ByteArrayInputStream(decodedBytes);
            BufferedImage image = ImageIO.read(bis);

            File outputFile = new File(uploadDir + File.separator +"ecommerce-frontend/public/generalfileStorage/"+File.separator+ randomUUID +".png");
            ImageIO.write(image, "png", outputFile);
            return randomUUID +".png";
        } catch (Exception e) {
            System.out.println(e);
            return "";
        }
    }


    private static String convertInputStreamToString(InputStream inputStream)
            throws IOException {

        ByteArrayOutputStream result = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length;
        while ((length = inputStream.read(buffer)) != -1) {
            result.write(buffer, 0, length);
        }

        return result.toString(StandardCharsets.UTF_8.name());

    }
}
