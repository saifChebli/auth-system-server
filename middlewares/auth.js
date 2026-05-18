import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer TOKEN

    console.log(authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ['Bearer' , 'TOKEN'] // GET Token value
    
    console.log(token)

    const decoded = jwt.verify(token , 'super_secret_key') // Verify Token

    console.log(decoded)

    req.user = decoded // Extract user information and attach to the request
    console.log(req.user.email)
    next()

  } catch (error) {
    res.status(401).json({message : "Invalid token"})
  }
};


// const BMW = {
//     year : 2002,
//     owner : 'Alice'
// }

// BMW.color = 'red'