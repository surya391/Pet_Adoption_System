export const TOKEN_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Verifying User </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify your Account </h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signingUp ! Click the link to Verify Account:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 16px; font-weight: bold; color: #4CAF50;">{token}</span>
    </div>
    <p>Best regards,<br>Pet Adoption System</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const OTP_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP for your LOGIN </title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">OTP for your LOGIN </h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signingIn ! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code to login.</p>
    <p>This code will expire in 5 minutes for security reasons.</p>
    <p>If you didn't try to login, please ignore this email.</p>
    <p>Best regards,<br> Pet Adoption System</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const sendAcceptanceEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interest Request Accepted</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Interest Request Accepted</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      
    <p>Hello, <strong> {providerName}</strong>  </p>
    
    <p>We are pleased to inform you that your interest request has been <strong style="color: #4CAF50;"> accepted </strong>by {ownerName}!</p>
    <p>Details of your request:</p>
    <div style="text-align: center; margin: 30px 0; font-size: 18px;">
      <strong>Pet Name: </strong> {petName} <br>
    </div>
    <p>You can now proceed with further communication regarding the service.</p>
    <p>If you have any questions, feel free to reach out.</p>
    <p>Best regards,<br> Pet Adoption System</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const FORGOT_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 30px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    <div style="background: linear-gradient(135deg, #007BFF, #0056b3); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Forgot Your Password?</h1>
    </div>
    <div style="padding: 25px;">
      <p style="font-size: 16px; margin-bottom: 15px;">Hello,</p>
      <p style="font-size: 14px; color: #555;">
        We received a request to reset the password for your account. If you did not request this, please ignore this email.
      </p>
      <p style="font-size: 14px; color: #555;">
        Click the button below to reset your password:
      </p>
      <div style="text-align: center; margin-top: 25px;">
        <a href="{token}" style="background: linear-gradient(135deg, #007BFF, #0056b3); color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; box-shadow: 2px 4px 6px rgba(0,0,0,0.15);">
          Click Here
        </a>
      </div>
      <p style="margin-top: 30px; font-size: 14px; font-weight: bold;">Best regards,<br>Pet Adoption System</p>
    </div>
    <div style="text-align: center; padding: 15px; background-color: #f1f1f1; font-size: 12px; color: #777;">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
