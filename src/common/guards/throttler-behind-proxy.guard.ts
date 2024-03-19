import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as requestIp from 'request-ip';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    return (
      requestIp.getClientIp(req as unknown as requestIp.Request) ?? 'null-ip'
    );
  }
}
