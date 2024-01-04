// import { Request, Response } from "express";
// import { userRegistrationService, userLoginService } from "../services/user.service";
// import { IError } from "../interfaces/error.interface";

// export const userRegistration = async (req: Request, res: Response) => {
//     try {
//         const result = await userRegistrationService(req.body);
//         res.json(result);
//     } catch (error: unknown) {
//         if ((error as IError).message) {
//           res.status(500).json({ error: (error as IError).message });
//         } else {
//           throw error
//         }
//       }
// }

// export const userLogin = async (req: Request, res: Response) => {
//     try {
//         const result = await userLoginService(req.body);
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message })
        
//     }
// } 