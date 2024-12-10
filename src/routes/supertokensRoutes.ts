import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";

const router = Router();

router.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

export default router; 