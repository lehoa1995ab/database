BAI 2
-- 1.Hiển thị toàn bộ nội dung của bảng architect:
 SELECT * FROM `architect` 
-- 2.Hiển thị danh sách gồm họ tên và giới tính của kiến trúc sư:
SELECT name,sex FROM `architect`
-- 3.Hiển thị những năm sinh có thể có của các kiến trúc sư:
SELECT birthday FROM `architect`
-- 4.Hiển thị danh sách các kiến trúc sư (họ tên và năm sinh) (giá trị năm sinh tăng dần):
SELECT name, birthday FROM `architect` ORDER BY birthday ASC;
-- 5.Hiển thị danh sách các kiến trúc sư (họ tên và năm sinh) (giá trị năm sinh giảm dần):
SELECT name, birthday FROM `architect` ORDER BY birthday DESC;
-- 6.Hiển thị danh sách các công trình có chi phí từ thấp đến cao. Nếu 2 công trình có chi phí bằng nhau sắp xếp tên thành phố theo bảng chữ cái (theo cột Building):
SELECT * FROM `building` ORDER BY cost ASC, city ASC;
BAI 4
-- 6.Hiển thị danh sách các công trình có chi phí từ thấp đến cao. Nếu 2 công trình có chi phí bằng nhau sắp xếp tên thành phố theo bảng chữ cái (theo cột Building):
SELECT * FROM `building` ORDER BY cost ASC, city ASC;
-- 1.Hiển thị tất cả thông tin của kiến trúc sư "le thanh tung":
SELECT * FROM `architect` WHERE name = 'le thanh tung';
-- 2.Hiển thị tên, năm sinh các công nhân có chuyên môn hàn hoặc điện
SELECT name,birthday FROM `worker` WHERE skill IN ('han', 'dien');
-- 2.Hiển thị tên, năm sinh các công nhân có chuyên môn hàn hoặc điện
SELECT name,birthday FROM `worker` WHERE skill IN ('han', 'dien');
-- 3.Hiển thị tên các công nhân có chuyên môn hàn hoặc điện và năm sinh lớn hơn 1948
SELECT name,birthday FROM `worker` WHERE skill IN ('han', 'dien') AND birthday > 1948;
-- 4.Hiển thị những công nhân bắt đầu vào nghề khi dưới 20 (birthday + 20 > year)
SELECT * FROM `worker` WHERE birthday > YEAR(CURDATE()) - 20;
-- 5.Hiển thị những công nhân có năm sinh 1945, 1940, 1948
SELECT * FROM `worker` WHERE birthday IN (1945, 1940, 1948);
-- 6.Tìm những công trình có chi phí đầu tư từ 200 đến 500 triệu đồng:
SELECT * FROM `building` WHERE cost BETWEEN 200 AND 500;
-- 7.Tìm kiếm những kiến trúc sư có họ là "nguyen" (tìm theo phần đầu của họ):
SELECT * FROM `architect` WHERE name LIKE 'nguyen%';
-- 8.Tìm kiếm những kiến trúc sư có tên đệm là "anh":
SELECT * FROM `architect` WHERE name LIKE '% anh %';
-- 9.Tìm kiếm những kiến trúc sư có tên bắt đầu bằng "th" và có độ dài là 3 ký tự:
SELECT * FROM `architect` WHERE name LIKE 'th__%';
-- 10.Tìm chủ thầu không có phone
SELECT * FROM `contractor` WHERE Phone IS NULL;
BAI 5
-- 1.Thống kê tổng số kiến trúc sư:
SELECT COUNT(*) AS TotalArchitects FROM `architect`;
-- 2.Thống kê tổng số kiến trúc sư nam:
SELECT COUNT(*) AS TotalMaleArchitects FROM `architect` WHERE sex = 'nam';
-- 3.Tìm ngày tham gia công trình nhiều nhất của công nhân
-- 4.Tìm ngày tham gia công trình ít nhất của công nhân
-- 5.Tìm tổng số ngày tham gia công trình của tất cả công nhân
SELECT SUM(total) AS TotalDaysWorked FROM `work`;
-- 6.Tìm tổng chi phí phải trả cho việc thiết kế công trình của kiến trúc sư có Mã số 1
SELECT SUM(benefit) AS TotalPayment FROM `design` WHERE architect_id = 1;
-- 7.Tìm trung bình số ngày tham gia công trình của công nhân
SELECT AVG(total) AS AverageDaysWorked FROM `work`;
-- 8.Hiển thị thông tin kiến trúc sư: họ tên, tuổi
SELECT name, YEAR(CURDATE()) - birthday AS Age FROM `architect`;
-- 9.Tính thù lao của kiến trúc sư: Thù lao = benefit * 1000

BAI 6
-- 1.Hiển thị thông tin công trình có chi phí cao nhất:
SELECT * FROM `building` ORDER BY cost DESC LIMIT 1;
-- 2.Hiển thị thông tin công trình có chi phí lớn hơn tất cả các công trình được xây dựng ở Cần Thơ
SELECT * FROM `building` WHERE cost > ALL (SELECT cost FROM building WHERE city = 'can tho');
-- 3.Hiển thị thông tin công trình có chi phí lớn hơn một trong các công trình được xây dựng ở Cần Thơ
SELECT * FROM `building` WHERE cost > ANY (SELECT cost FROM building WHERE city = 'can tho');
-- 4.Hiển thị thông tin công trình chưa có kiến trúc sư thiết kế
SELECT `building`.* FROM `building`LEFT JOIN `design` ON `building`.`id` = `design`.`building_id`WHERE `design`.`architect_id` IS NULL;
-- 5.Hiển thị thông tin các kiến trúc sư cùng năm sinh và cùng nơi tốt nghiệp
SELECT A1.*FROM `architect` AS A1JOIN `architect` AS A2 ON A1.`id` <> A2.`id`WHERE A1.`birthday` = A2.`birthday` AND A1.`place` = A2.`place`;
BAI 7
-- 1.Hiển thị thù lao trung bình của từng kiến trúc sư
SELECT architect_id, AVG(benefit) AS Average_benefit FROM `design`GROUP BY architect_id;
-- 2.Hiển thị chi phí đầu tư cho các công trình ở mỗi thành phố
SELECT city, SUM(cost) AS TotalInvestment FROM `building`GROUP BY city;
-- 3.Tìm các công trình có chi phí trả cho kiến trúc sư lớn hơn 50
SELECT * FROM `design` WHERE benefit > 50;
-- 4.Tìm các thành phố có ít nhất một kiến trúc sư tốt nghiệp
SELECT DISTINCT place FROM `architect`WHERE name IS NOT NULL;




