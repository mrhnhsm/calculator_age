import React, { useState, useEffect } from 'react';
import { DatePicker, Card, Row, Col, Typography, Alert, Divider } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'antd/dist/reset.css';

// Extend dayjs with duration plugin
dayjs.extend(duration);

const { Title, Text } = Typography;

export default function MainAgeCalculator() {
  // Set default reference date to July 6, 2025
  const defaultRefDate = dayjs('2025-07-01');

  const [birthDate, setBirthDate] = useState(null);
  const [referenceDate, setReferenceDate] = useState(defaultRefDate);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState('');

  // Calculate age whenever birthDate or referenceDate changes
  useEffect(() => {
    if (birthDate && referenceDate) {
      if (birthDate.isAfter(referenceDate)) {
        setError('Tanggal lahir tidak boleh setelah tanggal hitungan!');
        setAge({ years: 0, months: 0, days: 0 });
        return;
      }

      setError('');
      calculateAge();
    }
  }, [birthDate, referenceDate]);

  const calculateAge = () => {
    let years = referenceDate.diff(birthDate, 'year');
    let tempDate = birthDate.add(years, 'year');

    let months = referenceDate.diff(tempDate, 'month');
    tempDate = tempDate.add(months, 'month');

    let days = referenceDate.diff(tempDate, 'day');

    setAge({ years, months, days });
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };

  const handleRefDateChange = (date) => {
    setReferenceDate(date);
  };

  return (
    <div className="age-calculator-container">
      <Card className="calculator-card">
        <Title
          level={2}
          className="app-title">
          Kalkulator Umur Calon Siswa SD Swasta Ma'arif Kota Tebing Tinggi
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="error-alert"
          />
        )}

        <div className="input-section">
          <div className="date-input">
            <Text strong>Tanggal Lahir</Text>
            <DatePicker
              placeholder="Pilih tanggal lahir"
              onChange={handleBirthDateChange}
              className="date-picker"
              format="DD/MM/YYYY"
            />
          </div>

          <div className="date-input">
            <Text strong>Tanggal Hitungan</Text>
            <DatePicker
              placeholder="Pilih tanggal hitungan"
              onChange={handleRefDateChange}
              className="date-picker"
              defaultValue={defaultRefDate}
              format="DD/MM/YYYY"
            />
          </div>
        </div>

        <Divider className="divider">Hasil Perhitungan</Divider>

        <Row
          gutter={[16, 16]}
          className="result-cards">
          <Col
            xs={24}
            sm={8}>
            <Card className="result-card years-card">
              <div className="result-value">{age.years}</div>
              <div className="result-label">Tahun</div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={8}>
            <Card className="result-card months-card">
              <div className="result-value">{age.months}</div>
              <div className="result-label">Bulan</div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={8}>
            <Card className="result-card days-card">
              <div className="result-value">{age.days}</div>
              <div className="result-label">Hari</div>
            </Card>
          </Col>
        </Row>

        {birthDate && referenceDate && !error && (
          <div className="summary">
            <Text>Umur pada {referenceDate.format('DD MMMM YYYY')}:</Text>
            <Text
              strong
              className="summary-text">
              {age.years} tahun, {age.months} bulan, {age.days} hari
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}
