import nodemailer from 'nodemailer'
import { transportOptions, supportEmail } from '../../config'
import { weekDays, mails } from '../../data'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(
  transportOptions
)

export const sendVerificationMail = (email, id, token, lang) =>
  new Promise((resolve, reject) => {
    // generate random token
    let url = 'https://cookwork.eu/verifyaccount/' + id + '/' + token

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork Account Verification" <noreply@cookwork.eu>', // sender address
      to: email, // list of receivers
      subject: mails[lang].verificationMailSubject, // Subject line
      text: 'Please confirm your account by visiting the following url: ' + url, // plain text body
      html: mails[lang].verificationMail(url) // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(Error(err))
      else {
        console.log(info.response, '|', info.rejected[0] || info.accepted[0])
        resolve(info)
      }
    })
  })

export const sendOrderDetailsToUser = (email, order, kitchen, lang) =>
  new Promise((resolve, reject) => {
    order.dateFromString = order.dateFrom ? order.dateFrom.toLocaleDateString('nl-BE') : undefined
    order.dateToString = order.dateTo ? order.dateTo.toLocaleDateString('nl-BE') : undefined
    let text = ``
    let html = ``
    switch (order.type) {
      case 'once':
        text += mails[lang].sendOrderDetailsToUserOnce(order)
        break

      case 'recurring':
        order.daysFromString = weekDays[lang][weekDays.map[order.daysFrom]]
        order.daysToString = weekDays[lang][weekDays.map[order.daysTo]]
        text += mails[lang].sendOrderDetailsToUserRecurring(order)
        break

      case 'long':
        text += mails[lang].sendOrderDetailsToUserLong(order)
        break

      default:
        break
    }
    text += mails[lang].sendOrderDetailsToUserFooter(kitchen)

    html = text.replace(supportEmail, `<a href=mailto:${supportEmail}>${supportEmail}</a><br/>`)
    html = html.replace(/\n/g, '<br/>')

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork" <noreply@cookwork.eu>', // sender address
      to: email, // list of receivers
      subject: mails[lang].sendOrderDetailsToUserSubject, // Subject line
      text, // plain text body
      html: html // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(Error(err))
      else {
        console.log(info.response, '|', info.rejected[0] || info.accepted[0])
        resolve(order)
      }
    })
  })

export const sendOrderDetailsToStaff = (order, user, kitchen) =>
  new Promise((resolve, reject) => {
    order.dateFromString = order.dateFrom ? order.dateFrom.toLocaleDateString('nl-BE') : undefined
    order.dateToString = order.dateTo ? order.dateTo.toLocaleDateString('nl-BE') : undefined

    let text = ``
    let html = ``
    switch (order.type) {
      case 'once':
        text += `${user.firstName} ${user.lastName} has placed a new order.

        Order details:
        Timeframe: ${order.dateFromString}, ${order.hoursFrom}:00 - ${order.dateToString}, ${order.hoursTo}:00
        Days: ${order.totalDays}
        Hours: ${order.totalHours}
        Estimated price: €${order.totalPrice} (including service fee, excluding VAT)
        `
        break

      case 'recurring':
        order.daysFromString = weekDays['en'][weekDays.map[order.daysFrom]]
        order.daysToString = weekDays['en'][weekDays.map[order.daysTo]]
        text += `${user.firstName} ${user.lastName} has placed a new recurring order.

        Order details:
        Timeframe: ${order.daysFromString} to ${order.daysToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Days per week: ${order.totalDays}
        Hours per week: ${order.totalHours}
        Estimated price: €${order.totalPrice} per week (including service fee, excluding VAT)
        `
        break

      case 'long':
        text += `${user.firstName} ${user.lastName} has placed a new long term order.

        Order details:
        Timeframe: ${order.dateFrom} to ${order.dateTo}
        Days: ${order.totalDays}
        Estimated price: €${order.totalPrice} (including service fee, excluding VAT)
        `
        break

      default:
        break
    }
    text += `
        User details:
        Name: ${user.firstName} ${user.lastName}
        Email: ${user.email}

        Kitchen details:
        ID: ${kitchen.id}
        Name: ${kitchen.name}
        Address: ${kitchen.address}, ${kitchen.postalCode} ${kitchen.region}
        Listed hourly price: €${kitchen.price}
        Listed monthly rent: €${kitchen.rent || 'N/A'}

        This is an automated message from the CookWork platform.
        `
    html = text.replace(/Email: (.+)\n/, 'Email: <a href="mailto:$1">$1</a><br/>')
    html = html.replace(/\n/g, '<br/>')

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork" <noreply@cookwork.eu>', // sender address
      to: supportEmail, // list of receivers
      subject: 'New Cookwork Order ✔', // Subject line
      text, // plain text body
      html: html // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(Error(err))
      else {
        console.log(info.response, '|', info.rejected[0] || info.accepted[0])
        resolve(order)
      }
    })
  })

export const sendInfoToStaff = (info, user) =>
  new Promise((resolve, reject) => {
    let dateFrom = info.dateFrom ? info.dateFrom.toLocaleDateString('nl-BE') : undefined
    let dateTo = info.dateTo ? info.dateTo.toLocaleDateString('nl-BE') : undefined
    let html = ``
    let text = `${user.firstName} ${user.lastName} has requested information about kitchens in ${info.region}.

    Request details:
    Region: ${info.region}
    Purpose: ${info.purpose}`
    switch (info.type) {
      case 'once':
        text += `
        Type: one time
        Timeframe: ${dateFrom}, ${info.hoursFrom}:00 - ${dateTo}, ${info.hoursTo}:00`
        break

      case 'recurring':
        const daysFrom = weekDays['en'][weekDays.map[info.daysFrom]]
        const daysTo = weekDays['en'][weekDays.map[info.daysTo]]
        text += `
        Type: recurring
        Timeframe: ${daysFrom} to ${daysTo}, ${info.hoursFrom}:00 - ${info.hoursTo}:00`
        break

      case 'long':
        text += `
        Type: long term
        Timeframe: ${dateFrom} to ${dateTo}`
        break

      default:
        break
    }
    text += `
        Comments: ${info.comments}
        
        User details:
        Name: ${user.firstName} ${user.lastName}
        Activity: ${info.activity}
        Email: ${user.email}
        Phone: ${info.phone || user.phone || 'N/A'}

        This is an automated message from the CookWork platform.
        `
    html = text.replace(/Email: (.+)\n/, 'Email: <a href="mailto:$1">$1</a><br/>')
    html = html.replace(/\n/g, '<br/>')

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork" <noreply@cookwork.eu>', // sender address
      to: supportEmail, // list of receivers
      subject: 'New Cookwork Information Request ✔', // Subject line
      text, // plain text body
      html: html // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, msgInfo) => {
      if (err) reject(Error(err))
      else {
        console.log(msgInfo.response, '|', msgInfo.rejected[0] || user.email)
        resolve(info)
      }
    })
  })

export const sendEnquiryMail = (from, message) =>
  new Promise((resolve, reject) => {
    message += '\n\n\n' +
      '___________________________________' + '\n' +
      'Message sent from the cookwork.eu platform.\n' +
      `enquirer's email: <${from}>`

    let html = message.replace(/<(.+)>/g, '<a href="mailto:$1">$1</a>')
    html = html.replace(/\n/g, '<br/>')

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork Enquiry" <noreply@cookwork.eu>', // sender address
      to: supportEmail, // list of receivers
      subject: `You have a new enquiry from <${from}> `, // Subject line
      text: message, // plain text body
      html: html // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(Error(err))
      else resolve(info)
    })
  })

export const sendKitchenChangeNotification = (user, kitchen) =>
  new Promise((resolve, reject) => {
    const message = mails[user.lang].kitchenInfoChange(kitchen, user.lang)
    let html = message.replace(/<(.+)>/g, '<a href="mailto:$1">$1</a>')
    html = html.replace(/\n/g, '<br/>')

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Cookwork" <noreply@cookwork.eu>', // sender address
      to: user.email, // list of receivers
      subject: mails[user.lang].kitchenInfoChangeSubject, // Subject line
      text: message, // plain text body
      html: html // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(Error(err))
      else {
        console.log(info.response, '|', info.rejected[0] || info.accepted[0])
        resolve(kitchen)
      }
    })
  })
