import { Failure, Success } from "../model/transaction/LoginResponse.ts";

function getFailureResponse(text: string="unspecified", error: unknown="unspecified"): Failure {
    return {
        success: false,
        text: text,
        error: error
    }
}

function getSuccessResponse(text: string="unspecified"): Success {
    return {
        success: true,
        text: text,
        time_authorized: Date().toString()
    }
}

const ResponseService = {
    getFailureResponse,
    getSuccessResponse
}

export default ResponseService;