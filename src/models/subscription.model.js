import mongoose, {Schema} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,//The one who is Subscribing
        ref: user
    },
    channel: {
        type: Schema.Types.ObjectId,//to whome Subscriber is Subscribing
        ref: user
    },
},{timestamps: true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)