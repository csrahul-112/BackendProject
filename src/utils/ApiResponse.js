class ApiResponse {
    constructor(statudCode, data, message = "Success"){
        this.statusCode = this.statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}