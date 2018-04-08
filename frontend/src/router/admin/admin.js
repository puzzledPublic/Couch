import AdminPage from '@/components/AdminPage';
import AdminApplyList from '@/components/admin/AdminApplyList';

export default {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    children: [
        {
            path: '',
            component: AdminApplyList,
        }
    ]
}