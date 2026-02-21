import { ServerResponse } from "../model/LoginResponse.ts";

function getFailureResponse(text: string="No additionnal information", error: unknown="No additionnal data"): ServerResponse {
    return {
        s_success: false,
        s_text: text,
        s_error: error
    }
}

function getSuccessResponse(text: string="No additionnal information", data: unknown="No additionnal data"): ServerResponse {
    return {
        s_success: true,
        s_text: text,
        s_data: data
    }
}

const ResponseService = {
    getFailureResponse,
    getSuccessResponse
}

export default ResponseService;