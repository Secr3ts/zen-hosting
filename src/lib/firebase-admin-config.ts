import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from '@/../zenhosting-admin.json';

const firebaseAdminConfig = {
  credential: cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}