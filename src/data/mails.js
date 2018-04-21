import { supportEmail } from '../config'
import fields from './kitchen'

const mails = {
  en: {
    verificationMailSubject: `Please verify your Cookwork account ✔`,
    verificationMail: (url) => `Please confirm your account by clicking the following link: <a href="${url}">link</a>`,
    sendOrderDetailsToUserSubject: `New Cookwork Order ✔`,
    sendOrderDetailsToUserOnce: (order) => `You have succesfully placed your order.
    
        Order details:
        Timeframe: ${order.dateFromString} - ${order.dateToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Days: ${order.totalDays}
        Hours: ${order.totalHours}
        Estimated price: €${order.totalPrice} (including service fee, excluding VAT)
        `,
    sendOrderDetailsToUserRecurring: (order) => `You have succesfully placed your weekly reservation.
    
        Order details:
        Timeframe: ${order.daysFromString} to ${order.daysToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Days per week: ${order.totalDays}
        Hours per week: ${order.totalHours}
        Estimated price: €${order.totalPrice} per week (including service fee, excluding VAT)
        `,
    sendOrderDetailsToUserLong: (order) => `You have succesfully placed your order.
    
        Order details:
        Timeframe: ${order.dateFromString}, ${order.hoursFrom}:00 - ${order.dateToString}, ${order.hoursTo}:00
        Days: ${order.totalDays}
        Estimated price: €${order.totalPrice} (including service fee, excluding VAT)
        `,
    sendOrderDetailsToUserFooter: (kitchen) => `
        Kitchen details:
        Name: ${kitchen.name}
        Region: ${kitchen.region}
        Listed hourly price: €${kitchen.price}
        
        For additional information, you can contact Cookwork at ${supportEmail}
        This is an automated message from the CookWork platform.`,
    kitchenInfoChangeSubject: `Notification about kitchen information changes`,
    kitchenInfoChange: (kitchen, lang) => `Your kitchen information has been updated by the Cookwork admin.
        
        Your new information is as follows:
        
        ${fields[lang].name}: ${kitchen.name || 'N/A'}
        ${fields[lang].phone}: ${kitchen.phone}
        ${fields[lang].description}: ${kitchen.description || 'N/A'}
        ${fields[lang].address}: ${kitchen.address}
        ${fields[lang].size}: ${kitchen.size}
        ${fields[lang].AFSCA}: ${kitchen.AFSCA || 'N/A'}
        ${fields[lang].VAT}: ${kitchen.VAT}
        ${fields[lang].capacity}: ${kitchen.capacity || 'N/A'}
        ${fields[lang].capacityStanding} ${kitchen.standingCapacity || 'N/A'}
        ${fields[lang].capacitySitting} ${kitchen.sittingCapacity || 'N/A'}
        ${fields[lang].price}: ${kitchen.price}
        ${fields[lang].rent}: ${kitchen.rent || 'N/A'}`
  },
  fr: {
    verificationMailSubject: `Veuillez vérifier votre compte Cookwork ✔`,
    verificationMail: (url) => `Veuillez confirmer votre compte en cliquant sur le lien suivant: <a href="${url}"> lien </a>`,
    sendOrderDetailsToUserSubject: `Nouvelle commande de cuisson ✔`,
    sendOrderDetailsToUserOnce: (order) => `Vous avez passé votre commande avec succès.
    
        Détails de la commande:
        Période: ${order.dateFromString} - ${order.dateToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Jours: ${order.totalDays}
        Heures: ${order.totalHours}
        Prix estimé: €${order.totalPrice} (incluant le service, HTVA)
        `,
    sendOrderDetailsToUserRecurring: (order) => `Vous avez placé avec succès votre réservation hebdomadaire.
    
        Détails de la commande:
        Période: ${order.daysFromString} to ${order.daysToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Jours par semaine: ${order.totalDays}
        Heures par semaine: ${order.totalHours}
        Prix estimé: €${order.totalPrice} par semaine (incluant le service, HTVA)
        `,
    sendOrderDetailsToUserLong: (order) => `Vous avez passé votre commande avec succès.
    
        Détails de la commande:
        Période: ${order.dateFromString} - ${order.dateToString}
        Jours: ${order.totalDays}
        Prix estimé: €${order.totalPrice} (incluant le service, HTVA)
        `,
    sendOrderDetailsToUserFooter: (kitchen) => `
        Détails de la cuisine:
        Nom: ${kitchen.name}
        Région: ${kitchen.region}
        Prix horaire: €${kitchen.price}
        
        Pour plus d'information, vous pouvez contacter l'équipe Cookwork : ${supportEmail}
        Ce message est un message automatique de la plateforme Cookwork`,
    kitchenInfoChangeSubject: `Notification sur les modifications de l'annonce cuisine`,
    kitchenInfoChange: (kitchen, lang) => `Les informations de votre cuisine ont été modifiées par l'administrateur Cookwork.
    
    Les nouvelles informations sont les suivantes: 
        
    ${fields[lang].name}: ${kitchen.name || 'N/A'}
    ${fields[lang].phone}: ${kitchen.phone}
    ${fields[lang].description}: ${kitchen.description || 'N/A'}
    ${fields[lang].address}: ${kitchen.address}
    ${fields[lang].size}: ${kitchen.size}
    ${fields[lang].AFSCA}: ${kitchen.AFSCA || 'N/A'}
    ${fields[lang].VAT}: ${kitchen.VAT}
    ${fields[lang].capacity}: ${kitchen.capacity || 'N/A'}
    ${fields[lang].capacityStanding} ${kitchen.standingCapacity || 'N/A'}
    ${fields[lang].capacitySitting} ${kitchen.sittingCapacity || 'N/A'}
    ${fields[lang].price}: ${kitchen.price}
    ${fields[lang].rent}: ${kitchen.rent || 'N/A'}`
  },
  nl: {
    verificationMailSubject: `Controleer uw Cookwork-account ✔`,
    verificationMail: (url) => `Bevestig uw account door op de volgende link te klikken: <a href="${url}"> link </a>`,
    sendOrderDetailsToUserSubject: `Nieuwe Cookwork Order ✔`,
    sendOrderDetailsToUserOnce: (order) => `U hebt uw bestelling succesvol geplaatst.
    
        Details van u bestelling:
        Periode: ${order.dateFromString} - ${order.dateToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Dagen: ${order.totalDays}
        Uren: ${order.totalHours}
        Prijs: €${order.totalPrice} (Dienst inbegrepen, buiten BTW)
        `,
    sendOrderDetailsToUserRecurring: (order) => `U hebt uw wekelijkse reservering succesvol geplaatst.

        Details van u bestelling:
        Periode: ${order.daysFromString} - ${order.daysToString}, ${order.hoursFrom}:00 - ${order.hoursTo}:00
        Dagen per week: ${order.totalDays}
        Uren per week: ${order.totalHours}
        Prijs: €${order.totalPrice} per week (Dienst inbegrepen, buiten BTW)
        `,
    sendOrderDetailsToUserLong: (order) => `U hebt uw bestelling succesvol geplaatst.
    
        Details van u bestelling:
        Periode: ${order.dateFromString} - ${order.dateToString}
        Dagen: ${order.totalDays}
        Prijs: €${order.totalPrice} (Dienst inbegrepen, buiten BTW)
        `,
    sendOrderDetailsToUserFooter: (kitchen) => `
        Keuken details:
        Namen: ${kitchen.name}
        Regio: ${kitchen.region}
        Uurprijs: €${kitchen.price}
        
        Voor meer informatie, contacteer ons op ${supportEmail}
        This is an automated message from the CookWork platform.`,
    kitchenInfoChangeSubject: `Kennisgeving over veranderingen in de keukeninformatie`,
    kitchenInfoChange: (kitchen, lang) => `Uw keukeninformatie is gewijzigd door de Cookwork-beheerder.
    
    De nieuwe informatie is hier :
        
    ${fields[lang].name}: ${kitchen.name || 'N/A'}
    ${fields[lang].phone}: ${kitchen.phone}
    ${fields[lang].description}: ${kitchen.description || 'N/A'}
    ${fields[lang].address}: ${kitchen.address}
    ${fields[lang].size}: ${kitchen.size}
    ${fields[lang].AFSCA}: ${kitchen.AFSCA || 'N/A'}
    ${fields[lang].VAT}: ${kitchen.VAT}
    ${fields[lang].capacity}: ${kitchen.capacity || 'N/A'}
    ${fields[lang].capacityStanding} ${kitchen.standingCapacity || 'N/A'}
    ${fields[lang].capacitySitting} ${kitchen.sittingCapacity || 'N/A'}
    ${fields[lang].price}: ${kitchen.price}
    ${fields[lang].rent}: ${kitchen.rent || 'N/A'}`
  }
}

export default mails
