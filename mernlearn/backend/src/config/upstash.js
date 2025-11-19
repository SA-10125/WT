//after making a db on the upstash.com redis and putting the credentials in the .env file,
// npm install @upstash/ratelimit @upstash/redis

const {Ratelimit}=require("@upstash/ratelimit")
const {Redis}=require("@upstash/redis")

const dotenv=require("dotenv") //we need to access environment variables so we need this

//create a rate limiter that allows 100 requests per 60 seconds
const ratelimit=new Ratelimit({redis:Redis.fromEnv(), limiter:Ratelimit.slidingWindow(100,"60 s")}) //we are saying get the rate limit from the redis environment variables and limiter according to how much we want

module.exports= ratelimit;