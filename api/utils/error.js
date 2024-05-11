// Here the error that are newly defined for the application is defined 

export const errorHandler=(statusCode,message)=>{
    const error=new Error()
    error.statusCode=statusCode
    error.message=message
    return error

}