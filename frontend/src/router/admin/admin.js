import AdminPage from '@/components/AdminPage';
import AdminApplicationList from '@/components/admin/AdminApplicationList';

export default {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    children: [
        {
            path: '',
            component: AdminApplicationList,
        }
    ]
}