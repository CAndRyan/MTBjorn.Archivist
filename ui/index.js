import { renderElementAsAppend } from '@mtbjorn/hypotenuse/ui';
import { ArchiveApp } from '../src/index';

const renderTestUi = (parentElementId) => {
    renderElementAsAppend(<ArchiveApp />, parentElementId);
};

export {
    renderTestUi
};
