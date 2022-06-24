import {test as base} from '@playwright/test'
import { ContactModal } from '../pages/contactModal'
import {  Credentials } from '../data/login';


export const test = base.extend<{contactModal:ContactModal}>({
    contactModal:async ({page}, use) =>{
    const contactModal = new ContactModal(page);
    await contactModal.openContactModal(Credentials.CorrectUsername,Credentials.CorrectPassword);
    await use(contactModal);
    }
});