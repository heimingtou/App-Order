import { ulid } from 'ulid';
import { DataSource } from 'typeorm';

// Giả sử đây là hàm thực hiện migrate
export async function migrateBillIds(dataSource: DataSource) {
    const batchSize = 1000; // Xử lý 1000 bản ghi mỗi lần
    let updatedCount = 0;

    try {
        console.log('Bắt đầu quá trình chuyển đổi ID sang ULID...');

        while (true) {
            // 1. Lấy một lô (batch) các bản ghi chưa có new_id
            const bills = await dataSource.query(
                `SELECT bill_id FROM bills WHERE new_id IS NULL LIMIT $1`,
                [batchSize]
            );

            // Nếu không còn bản ghi nào thì dừng vòng lặp
            if (!bills || bills.length === 0) {
                break;
            }

            // 2. Duyệt qua từng dòng để cập nhật
            for (const row of bills) {
                const generatedUlid = ulid(); // Sinh mã ULID mới (ví dụ: 01H... )
                
                // Cập nhật vào cột new_id dựa theo bill_id cũ
                await dataSource.query(
                    `UPDATE bills SET new_id = $1 WHERE bill_id = $2`,
                    [generatedUlid, row.bill_id]
                );
            }

            updatedCount += bills.length;
            console.log(`Đã cập nhật xong ${updatedCount} bản ghi...`);
        }

        console.log('Hoàn tất quá trình migrate ULID cho toàn bộ bảng bills!');
    } catch (error) {
        console.error('Lỗi trong quá trình migrate:', error);
    }
}