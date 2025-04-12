package com.resume.analyzer;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    @Autowired
    private ChatModel chatClient;

    @GetMapping("/prompt")
    public String prompt(@RequestParam String prompt) {
        return chatClient.call(prompt);
    }
}
