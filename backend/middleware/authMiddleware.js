import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    console.log("this is authmiddleware");
        try
        {const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const [_, token] = authHeader.split(" ");
        console.log("Token:",token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userid = decodedtoken.id; 
        next();}
        catch(error)
        {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
}
