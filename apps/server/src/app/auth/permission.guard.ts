import { UserPermission } from '@gui-nx/types';
import { CanActivate, ExecutionContext,Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private permissions: UserPermission[]) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.permissions.includes(request.user.permission);
  }
}
