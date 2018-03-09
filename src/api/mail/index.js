import { Router } from 'express'
import bodyParser from 'body-parser'
import { sendEnquiryMail } from '../../services/mailgun'

const router = new Router()

router.post('/enquiry/',
    (req, res) => {
        sendEnquiryMail(req.body.email, req.body.message)
            .then(info => {
                console.log("New enquiry sent from <" + req.body.email + ">");
                res.status(200).json({ status: "success" })
            })
            .catch(err => res.status(500).json(err));
    })

export default router
