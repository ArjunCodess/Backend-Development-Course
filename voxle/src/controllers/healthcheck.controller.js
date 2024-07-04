import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const healthcheck = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse(200, "OK", "Health Check Passed."));
});

export { healthcheck };