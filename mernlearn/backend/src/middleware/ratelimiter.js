const ratelimit=require("../config/upstash.js")

const rateLimiter=async(req,res,next)=>{ //arrow function since were assigning it to a variable.
    //we do checks
    try {
        const {success}=await ratelimit.limit("my-limit-key") //right now, since its not per user, if anyone sends 100 requests per minute, everyone would be blocked.
        //if we had user authentication set up, we could do
        //const {success}=await ratelimit.limit(userid) //this would ratelimit each user induvidually. (each can send x requests in y seconds)
        //we could also put rate limit based on IP adress

        if(!success){return res.status(429).json({message:"too many requests, please try again after a while"})}

        //then call the next function
        next();

    } catch (error) {
        console.error("Rate limit error",error);
        next(error);

    }
}
//now go to postman and spam get requests and see what happens (or any requests for that matter.)

module.exports= rateLimiter;