import {test as base} from '@playwright/test'
import { ContactModal } from '../pages/contactModal'



export const test = base.extend<{contactModal:ContactModal}>({
    contactModal:async ({page}, use) =>{
    const contactModal = new ContactModal(page);
    await use(contactModal);
    }
});