package com.dalama.camunda;

import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Collections;
import java.util.logging.Logger;

@Configuration
@ExternalTaskSubscription("send-reminder-mail")
public class SendReminderMailWorker implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(SendReminderMailWorker.class.getName());

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        System.out.println("Hello from SendReminderMailWorker");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("davide@marcoli.ch");
        message.setTo("davide@marcoli.ch"/*, "orangesushi494@gmail.com"*/);
        message.setSubject("TESTING");
        message.setText("DAS IST EIN TEST");
        emailSender.send(message);

        // Complete the task
        externalTaskService.complete(externalTask);
    }

}
