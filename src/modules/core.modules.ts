import { AuthRouter } from './authentication/authentication.module';
import { UserRouter } from './user/user.module';
import { RbacRouter } from './rbac/rbac.module';
import { SwaggerAPIRouter } from '../routes';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger.json';
import { SuccessResponse } from '../components/successResponse';
const swaggerUi = require('swagger-ui-express');
import * as cross from 'cors';
import { RuleRouter } from './rule/rule.module';
import { CompanyRouter } from './company/company.module';
import { ProjectRouter } from './project/project.module';
import { TrackingRouter } from './tracking/tracking.module';
import { SettingRouter } from './setting/setting.module';
import { PlanRouter } from './plan/plan.module';
import { TaskRouter } from './task/task.module';
import { SprintRouter } from './sprint/sprint.module';
import { TrackingSessionRouter } from './tracking/trackingSession.module';
import { NotificationRouter } from './notifications/notification.module';
import { MailRouter } from './mails/mail.module';

module.exports = (app) => {
    /**
     * Add auth module
     */
    app.use('/auth', cross(), AuthRouter);
    /**
     * Add user module
     */
    app.use('/api/users', cross(), UserRouter);

    /**
     * Add Rbac module
     */
    app.use('/api/rbac', cross(), RbacRouter);
    /**
     * Add rule module
     */
    app.use('/api/rule', cross(), RuleRouter);
    /**
     * Add company module
     */
    app.use('/api/company', cross(), CompanyRouter);

    /**
     * Add Project module
     */
    app.use('/api/project', cross(), ProjectRouter);

    /**
     * Add Tracking module
     */
    app.use('/api/tracking', cross(), TrackingRouter);
    /**
     * Add Tracking module
     */
    app.use('/api/trackingsession', cross(), TrackingSessionRouter);

    /**
     * Add Settings module
     */
    app.use('/api/setting', cross(), SettingRouter);

    /**
     * Add Plan module
     */
    app.use('/api/plan', cross(), PlanRouter);

    /**
     * Add Task module
     */
    app.use('/api/task', cross(), TaskRouter);
    /**
     * Add Sprint module
     */
    app.use('/api/sprint', cross(), SprintRouter);
      /**
       * Add Notification module
       */
       app.use('/api/notification', cross(), NotificationRouter);
        /**
         * Add mails module
         */
         app.use('/api/mail', cross(), MailRouter);
    /**
     * Add swagger endpoints
     */
    const options = {
        customCss: '.swagger-ui .topbar { display: none }'
    };
    app.use('/', swaggerUi.serve);
    app.get('/', swaggerUi.setup(swaggerDocument));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));
    app.use('/api/v1', SwaggerAPIRouter);
    app.use('/api/ping', function (req, resp, next) {
        const respM: SuccessResponse = new SuccessResponse(req, resp, 560, {}, 'pong');
        respM.sendStatus(resp);
    });
};
