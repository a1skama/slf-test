import nodemailer from "nodemailer";

const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: 587,
  secure: false, // true для портов 465, false для других портов
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  let invoiceNumber = "";
  if (body.invoiceNumber) {
    invoiceNumber = `\n    Номер счета: ${body.invoiceNumber}`;
  }

  const options = {
    subject: "Новая заявка с сайта - slf.expert",
    text: `
    Имя: ${body.name}

    Телефон: ${body.phone}

    E-mail: ${body.email}

    ${body.service ? `Услуга: ${body.service}` : ""}

    ${body.expert ? `Специалист: ${body.expert}` : ""}

    ${body.price ? `Стоимость: ${body.price} ₽` : ""}${invoiceNumber}

    ${body.practic ? `Практика: ${body.practic}` : ""}

    ${body.comment ? `Комментарий: ${body.comment}` : ""}

    ${body.date ? `Дата и время: ${body.date}` : ""}

    `,
    attachments:
      body.files?.map((file) => {
        if (file) {
          return {
            filename: file.name,
            content: Buffer.from(file.content, "base64"), // предполагается, что файл передается в base64
          };
        }
      }) || [],
  };

  const mailOptions = {
    from: config.emailUser,
    to: config.emailUser,
    ...options,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});
