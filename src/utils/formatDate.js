export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const bulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const tanggal = date.getDate();
    const bulanIndex = date.getMonth();
    const tahun = date.getFullYear();
    
    const jam = String(date.getHours()).padStart(2, '0');
    const menit = String(date.getMinutes()).padStart(2, '0');

    return `${tanggal} ${bulan[bulanIndex]} ${tahun} ${jam}:${menit} WIB`;
}
