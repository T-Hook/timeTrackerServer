const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const ServerUrl = process.env.FRONT_CLIENT_URL;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
        user: smtpUser,
        pass: smtpPassword
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * @class ProjectService
 */
class MailingService {


    /**
     * @description Saves the project in the storage
     * @param {Rule} project
     * @returns {Promise<Rule>}
     */
    async sendValidationMail(email, token) {
        const validationUrl = ServerUrl + '/auth/activate/' + token + '"';
        const secureValidationUrl = 'https://www.google.com/url?q=' + ServerUrl + '/auth/activate/' + token + '"';
        try {
            const info = await transporter.sendMail({
                from: 'admin@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Validation mail ✔', // Subject line
                text: '', // plain text body
                html: '<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">\n' +
                    '    <tbody>\n' +
                    '    <tr>\n' +
                    '        <td align="center" height="25"><span\n' +
                    '                style="color:#6e6e6e;font:11px/14px Arial,Helvetica,sans-serif;text-decoration:none"> <span\n' +
                    '                style="font:bold 12px/16px Arial,Helvetica,sans-serif"> You may <a\n' +
                    '                href=""\n' +
                    '                style="text-decoration:underline;border:0;font:bold 12px/16px Arial,Helvetica,sans-serif;color:#6e6e6e"\n' +
                    '                target="_blank"\n' +
                    '                data-saferedirecturl="">unsubscribe</a> if you have received this email by mistake. </span> </span>\n' +
                    '        </td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <td height="0" style="line-height:0;font-size:0">&nbsp;</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <td align="center" bgcolor="#ffffff"\n' +
                    '            style="border-left:1px solid;border-right:1px solid;border-bottom:1px solid;font-size:0;border-color:#e8e8e8;background-color:#ffffff">\n' +
                    '            <table cellpadding="0" cellspacing="0" border="0" width="100%">\n' +
                    '                <tbody>\n' +
                    '                <tr>\n' +
                    '                    <td height="10" width="20"></td>\n' +
                    '                    <td></td>\n' +
                    '                    <td width="20"></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td></td>\n' +
                    '                    <td align="center"><span style="font:19px/23px Arial,Helvetica,sans-serif;color:#585858"> Please confirm your email on ! </span>\n' +
                    '                    </td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td height="15"></td>\n' +
                    '                    <td></td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td></td>\n' +
                    '                    <td align="center"><a\n' +
                    '                            href="' + validationUrl + '"\n' +
                    '                            style="display:block;border:0;text-decoration:none" target="_blank"\n' +
                    '                            data-saferedirecturl="' + secureValidationUrl + '">\n' +
                    '                        <table bgcolor="#ab47bc" align="center" class="m_3235580750593754060button_css"\n' +
                    '                               lang="button_css" cellpadding="0" cellspacing="0" border="0" width="240">\n' +
                    '                            <tbody>\n' +
                    '                            <tr>\n' +
                    '                                <td width="20" height="10"></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td width="20"></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr>\n' +
                    '                                <td></td>\n' +
                    '                                <td align="center" valign="middle"><span\n' +
                    '                                   href=""' +
                    '                                   data-saferedirecturl=""' +
                    '                                        style="color:#ffffff;font:bold 18px/23px Arial,Helvetica,sans-serif;text-decoration:none"> Confirm email </span>\n' +
                    '                                </td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr>\n' +
                    '                                <td height="10"></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            </tbody>\n' +
                    '                        </table>\n' +
                    '                    </a></td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                </tbody>\n' +
                    '            </table>\n' +
                    '        </td>\n' +
                    '    </tr>\n' +
                    '\n' +
                    '    <tr>\n' +
                    '        <td style="line-height:0px;font-size:0px">&nbsp;</td>\n' +
                    '    </tr>\n' +
                    '    </tbody>\n' +
                    '</table>\n'
            });

            return info.response;
        } catch (e) {
            return (e);
        }
    }

    /**
     * @param email
     * @param token
     */
    async sendResetPasswordMail(email, token) {
        const validationUrl = ServerUrl + '/passwordreset/' + token + '"';
        const secureValidationUrl = 'https://www.google.com/url?q=' + ServerUrl + '/passwordreset/' + token + '"';
        try {
            const info = await transporter.sendMail({
                from: 'admin@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Reset password ✔', // Subject line
                text: '', // plain text body
                html: '<table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">\n' +
                    '    <tbody>\n' +
                    '    <tr>\n' +
                    '        <td align="center" height="25"><span\n' +
                    '                style="color:#6e6e6e;font:11px/14px Arial,Helvetica,sans-serif;text-decoration:none"> <span\n' +
                    '                style="font:bold 12px/16px Arial,Helvetica,sans-serif"> You may <a\n' +
                    '                href=""\n' +
                    '                style="text-decoration:underline;border:0;font:bold 12px/16px Arial,Helvetica,sans-serif;color:#6e6e6e"\n' +
                    '                target="_blank"\n' +
                    '                data-saferedirecturl="">unsubscribe</a> if you have received this email by mistake. </span> </span>\n' +
                    '        </td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <td height="0" style="line-height:0;font-size:0">&nbsp;</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <td align="center" bgcolor="#ffffff"\n' +
                    '            style="border-left:1px solid;border-right:1px solid;border-bottom:1px solid;font-size:0;border-color:#e8e8e8;background-color:#ffffff">\n' +
                    '            <table cellpadding="0" cellspacing="0" border="0" width="100%">\n' +
                    '                <tbody>\n' +
                    '                <tr>\n' +
                    '                    <td height="10" width="20"></td>\n' +
                    '                    <td></td>\n' +
                    '                    <td width="20"></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td></td>\n' +
                    '                    <td align="center"><span style="font:19px/23px Arial,Helvetica,sans-serif;color:#585858"> Click to reset your password! </span>\n' +
                    '                    </td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td height="15"></td>\n' +
                    '                    <td></td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                <tr>\n' +
                    '                    <td></td>\n' +
                    '                    <td align="center"><a\n' +
                    '                            href="' + validationUrl + '"\n' +
                    '                            style="display:block;border:0;text-decoration:none" target="_blank"\n' +
                    '                            data-saferedirecturl="' + secureValidationUrl + '">\n' +
                    '                        <table bgcolor="#ab47bc" align="center" class="m_3235580750593754060button_css"\n' +
                    '                               lang="button_css" cellpadding="0" cellspacing="0" border="0" width="240">\n' +
                    '                            <tbody>\n' +
                    '                            <tr>\n' +
                    '                                <td width="20" height="10"></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td width="20"></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr>\n' +
                    '                                <td></td>\n' +
                    '                                <td align="center" valign="middle"><span\n' +
                    '                                   href=""' +
                    '                                   data-saferedirecturl=""' +
                    '                                        style="color:#ffffff;font:bold 18px/23px Arial,Helvetica,sans-serif;text-decoration:none"> Reset Password </span>\n' +
                    '                                </td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            <tr>\n' +
                    '                                <td height="10"></td>\n' +
                    '                                <td></td>\n' +
                    '                                <td></td>\n' +
                    '                            </tr>\n' +
                    '                            </tbody>\n' +
                    '                        </table>\n' +
                    '                    </a></td>\n' +
                    '                    <td></td>\n' +
                    '                </tr>\n' +
                    '                </tbody>\n' +
                    '            </table>\n' +
                    '        </td>\n' +
                    '    </tr>\n' +
                    '\n' +
                    '    <tr>\n' +
                    '        <td style="line-height:0px;font-size:0px">&nbsp;</td>\n' +
                    '    </tr>\n' +
                    '    </tbody>\n' +
                    '</table>\n'
            });

            return info.response;
        } catch (e) {
            return (e);
        }
    }


}

export default new MailingService();
