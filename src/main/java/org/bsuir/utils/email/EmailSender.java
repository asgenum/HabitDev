package org.bsuir.utils.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class EmailSender {

	@Autowired
	EmailService emailService;

	public boolean sendMail(String firstName, String lastName, String userEmail, String mailTheme) {

		String from = "habitdevapp@gmail.com";

		EmailTemplate template = new EmailTemplate("registration-email.html");

		Map<String, String> replacements = new HashMap<String, String>();
		replacements.put("user", firstName + " " + lastName);
		replacements.put("today", String.valueOf(new Date()));
		replacements.put("email", userEmail);

		String message = template.getTemplate(replacements);

		Email email = new Email(from, userEmail, mailTheme, message, userEmail);
		email.setHtml(true);
		emailService.send(email);
		return true;
	}

}
