import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints";
import { GetResponse, PostResponse,PublicPostResponse, PutResponse } from "./http";
import type { AdminUser,LoginPayload, RegisterPayload } from "./props.service";
import { StandardResponse,toServiceResponse } from "./service-response";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

class AuthService {
  public async Login(payload: LoginPayload): Promise<StandardResponse<{ token: string; refreshToken?: string; user: AdminUser }>> {
    const res = await PublicPostResponse<{ token: string; refreshToken?: string; user: AdminUser }>(
      AUTH_ENDPOINTS.LOGIN,
      payload
    );
    return toServiceResponse(res, {
      message: "Login berhasil",
      statusCode: 200,
    });
  }

  public async Register(payload: RegisterPayload): Promise<StandardResponse<AdminUser>> {
    const res = await PublicPostResponse<AdminUser>(
      AUTH_ENDPOINTS.REGISTER,
      payload
    );
    return toServiceResponse(res, {
      message: "Register berhasil",
      statusCode: 201,
    });
  }

  public async GetMe(): Promise<StandardResponse<AdminUser>> {
    const res = await GetResponse<AdminUser>(AUTH_ENDPOINTS.ME);
    return toServiceResponse(res, {
      message: "Get me berhasil",
      statusCode: 200,
    });
  }

  public async UpdateProfile(payload: UpdateProfilePayload): Promise<StandardResponse<AdminUser>> {
    const res = await PutResponse<AdminUser>(AUTH_ENDPOINTS.PROFILE, payload);
    return toServiceResponse(res, {
      message: "Profil berhasil diperbarui",
      statusCode: 200,
    });
  }
  public async Logout(): Promise<StandardResponse<null>> {
    const res = await PostResponse<null>(AUTH_ENDPOINTS.LOGOUT);
    return toServiceResponse(res, {
      message: "Logout berhasil",
      statusCode: 200,
    });
  }
}

export default new AuthService();
