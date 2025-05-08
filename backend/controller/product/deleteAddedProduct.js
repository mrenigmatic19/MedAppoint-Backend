const productModel = require("../../models/productModel");


const deleteProduct = async(req,res)=>{
    try{
        const UserId = req.userId 
        if(!UserId){
            return res.json({
                message : "User Not Found",
                error : true,
                success : false
            })
        }
        const { productId } = req.params;
        const product= await productModel.findById(productId);
        if(!product){
            return res.json({
                message : "Product Not Found",
                error : true,
                success : false
            })
        }   

        if (product.hospitalId.toString() !== UserId.toString()) {
            throw new Error("You are not authorized to delete this subscription");
        }
        
        await hospitalModel.findByIdAndUpdate(UserId, {
            $pull: { medicalProductsOffered: productId }
        });
        
        const deleteProduct = await productModel.deleteOne({ _id : productId });
        if(!deleteProduct){
            return res.json({
                message : "Product Not Found",
                error : true,
                success : false
            })
        }

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteProduct