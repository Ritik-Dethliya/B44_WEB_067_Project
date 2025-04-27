import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "dethliya73@gmail.com",
      pass: process.env.AppPassword,
    },
  });
  
export async function communityCreateMail(email,userName,category) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Donation Villa" dethliya73@gmail.com',
      to: `${email}`, 
      subject: `🎉 Your ${category} Community is Live!`, // Subject line
      text: 
      `Hello ${userName},
      Congratulations! Your donation community has been successfully created.
      Thank you for taking a step toward empowering women and making a meaningful difference in their lives. 
      We’re excited to have you as part of the journey.
      Together, we rise.
  
      Warm regards,
      Team Donation Villa`,
      html: 
        `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">🎉 Community Successfully Created!</h2>
        <p>Hello,</p>
        <p>Congratulations! Your donation community for ${category} is now live.</p>
        <p>Thank you for stepping forward to make a real impact in the lives of women who need it most. Your efforts can inspire change, spark hope, and create opportunity.</p>
        <p>Together, we rise.</p>
        <br />
        <p>Warm regards,<br/><strong>Team Donation Villa</strong></p>
      </div>
    `
      ,
    });
  
    console.log("Message sent: %s", info.messageId);
    
  }

  export async function donationemail(email,userName) {
    // send mail with defined transport object
    console.log(email,userName)
    const info = await transporter.sendMail({
      from: '"Donation Villa" dethliya73@gmail.com',
      to: `${email}`, 
      subject: `🙏 Thank You for Your Kind Donation!`, // Subject line
      text: 
      `Dear ${userName},
      Thank you for your generous support. Your donation is helping provide care, food, and shelter to animals in need. 
      
      Because of kind hearts like yours, we’re one step closer to a more compassionate world.
      
      Warm regards,  
      Team Donation Villa`,
      html: 
        `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #4CAF50;">🙏 Thank You for Your Kind Donation!</h2>
      <p>Dear Donor,</p>
      <p>We are deeply grateful for your recent contribution to our animal welfare initiative. Your generosity is making a real difference—providing safety, care, and love to animals who need it most.</p>
      <p>Because of people like you, lives are being saved and tails are wagging in joy!</p>
      <p>Together, we’re building a world where every animal is treated with kindness.</p>
      <br />
      <p>With heartfelt thanks,<br/><strong>Team Donation Villa</strong></p>
      </div>
    `
      ,
    });
  
    console.log("Message sent: %s", info.messageId);
    
  }