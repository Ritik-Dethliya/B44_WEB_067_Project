import e from 'express'
import donationModel from '../models/donation.model.js'
import authentication from '../middlewares/authmiddleware.js'
import userModel from '../models/user.model.js'
import { donationemail } from '../middlewares/emailSender.js'
import communityModel from '../models/community.model.js'

const donationRouter=e.Router()

donationRouter.post('/add-donation/:id',authentication ,async(req,res)=>{
    try {
        let {id}=req.params
        req.body.donar=req.userid
        let newDonation=await donationModel.create(req.body)
        let newDonationid=newDonation._id
        let user=await userModel.findById(req.userid)
        user.donations.push(newDonationid._id)
        await user.save()

        let community=await communityModel.findById(id)
        let donars=community.donors
        let ispresent=donars.findIndex((donorid)=>donorid==req.userid)
        if(ispresent==-1){
            community.donors.push(req.userid)
        }
        community.collectedAmount+=Number(req.body.amount)
        await community.save()
        console.log(newDonationid)

        donationemail(user.email,user.name)
        res.status(201).send({"msg":"donation created Successful",newDonation})
    } catch (error) {
        console.log(error)
        if(error.errorResponse.code==11000)return res.status(404).send({"msg":"Duplicate transactionId"})
        //console.log("error in donation create",error)
        res.status(500).send({"msg":"Something went wrong during donation creation"})
    }
})
export default donationRouter