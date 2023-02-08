const {Shop, Seller} = require('../models')
const responseUltil = require('../utils/response.util')
const cloudinary = require('cloudinary').v2




cloudinary.config({
    cloud_name: "djbju13al",
    api_key: "575615221649691",
    api_secret: "Se08c_VicYMCRnyYIXGcDHpRmMY"
})

module.exports = {
    create: async (body, sellerId, files) => {
        try {
            
            const oldShop = await Shop.findOne({where: {shopName: body.shopName}})
            if(!oldShop){
                const image = files.image
                const result = await cloudinary.uploader.upload(image.tempFilePath, {
                    public_id: `${Date.now()}`,
                    resource_type: "auto",
                    folder: "Shop"
                })
                const newShop = await Shop.create({
                    shopName: body.shopName,
                    rate: 0,
                    desc: body.desc,
                    isBlock: true,
                    image: result.url,
                    sellerId: sellerId
                })
                return responseUltil.created(newShop)
            }else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        data: [],
                        errors: "Shop is already exists"
                    }
                }
            }
            
        } catch (error) {
            console.log(error)
            return responseUltil.serverError()
        }
    },
    block: async (shopId) => {
        try {
            const shop = await Shop.findOne({where: {id: shopId}})
            if(shop){
                shop.isBlock = false
                await shop.save()
            }
            return responseUltil.getSuccess(shop)
        } catch (error) {
            console.log(error)
            return responseUltil.serverError()
        }
    },
    unLock: async (shopId) => {
        try {
            const shop = await Shop.findOne({where: {id: shopId}})
            if(shop){
                shop.isBlock = true
                await shop.save()
            }
            return responseUltil.getSuccess(shop)
        } catch (error) {
            console.log(error)
            return responseUltil.serverError()
        }
    }
}