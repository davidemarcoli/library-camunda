package com.dalama.camunda;

import java.util.Collections;
import java.util.logging.Logger;

import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
@ExternalTaskSubscription("check-number")
public class ExampleCheckNumberWorker implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(ExampleCheckNumberWorker.class.getName());

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        System.out.println("Hello from ExampleCheckNumberWorker");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("davide@marcoli.ch");
        message.setTo("davide@marcoli.ch", "orangesushi494@gmail.com");
        message.setSubject("TESTING");
        message.setText("DAS IST EIN TEST");
        emailSender.send(message);

        // Get a process variable
        String someProcessVariable = (String) externalTask.getVariable("someProcessVariable");

        boolean isNumber = false;
        try {
            Long.parseLong(someProcessVariable);
            isNumber = true;
        } catch (NumberFormatException e) {
            LOGGER.info(someProcessVariable + " is not numeric");
        }

        LOGGER.info("Returning validate=" + isNumber);

        // Complete the task
        externalTaskService.complete(externalTask, Collections.singletonMap("isNumber", isNumber));
    }

}
