import { Html,Head,Font,Preview,Heading,Text,Button,Section,Column,Row } from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html>
            <Head >
            <title>verification email code</title>
            <Font fontFamily="Inter" fallbackFontFamily="Arial" fontWeight={400} fontStyle="normal"/>
            </Head>
            <Preview>verification code</Preview>

            <section>
                <Row>
                    <Heading>verification code</Heading>
                </Row>
                <Row>
                    <text>Thank you for registering.please use the following verification code to complete your registration</text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>if you did not request this code, please ignore this email</Text>
                </Row>
            </section>

        </Html>
    )
}