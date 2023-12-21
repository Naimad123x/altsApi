import express, { Request, Response } from "express";
const routerReport = express.Router();

routerReport.all(`/`,  async (req: Request, res: Response, next) => {
  // @ts-ignore
  if(!req.user)
    return res.redirect(`/login`);
  next();
})
routerReport.get(`/`,  async (req: Request, res: Response) => {
  return res.render(`report`);

});

export default routerReport;