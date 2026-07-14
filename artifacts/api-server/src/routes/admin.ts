import { Router, type IRouter } from "express";
import { AdminLoginBody, AdminLoginResponse, AdminLogoutResponse, GetAdminSessionResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    req.log.error("ADMIN_PASSWORD is not configured");
    res.status(500).json({ error: "Admin login is not configured" });
    return;
  }

  if (parsed.data.password !== adminPassword) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Incorrect password" });
    return;
  }

  req.session.isAdmin = true;
  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  req.session.isAdmin = false;
  req.session.destroy(() => {
    res.json(AdminLogoutResponse.parse({ authenticated: false }));
  });
});

router.get("/admin/session", async (req, res): Promise<void> => {
  res.json(
    GetAdminSessionResponse.parse({ authenticated: !!req.session?.isAdmin }),
  );
});

export default router;
