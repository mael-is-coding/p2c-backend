import { Failure, Success } from "../model/LoginResponse.ts";

function getFailureResponse(text: string="No additionnal information", error: unknown={data: "No additionnal data"}): Failure {
    return {
        success: false,
        text: text,
        error: error
    }
}

function getSuccessResponse(text: string="No additionnal information", data: unknown={data: "No additionnal data"}): Success {
    return {
        success: true,
        text: text,
        data: data
    }
}

const ResponseService = {
    getFailureResponse,
    getSuccessResponse
}

export default ResponseService;