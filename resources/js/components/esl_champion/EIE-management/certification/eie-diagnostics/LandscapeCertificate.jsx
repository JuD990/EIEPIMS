import React from "react";
import backCert from "@assets/backCert2.png";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
    Image
} from "@react-pdf/renderer";

Font.register({
    family: 'Helvetica',
    family: 'Helvetica-Bold',
    family: 'Helvetica-Oblique',
    family: 'Helvetica-BoldOblique',
    family: 'Courier-Bold',
});

// Styles for landscape layout
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        padding: 40,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        fontFamily: "Helvetica",
        flexDirection: 'row',
        position: 'relative',
    },
    pageBackground: {
        position: 'absolute',
        right: -40,
        width: "130%",
        height: "116%",

    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
        position: "relative",
        zIndex: 1,
    },
    logo: {
        width: "120px",
        height: "auto",
        marginBottom: 10,
        alignSelf: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Helvetica-Bold",
    },
    subtitle1: {
        fontSize: 18,
        color: "#DC2626",
        fontFamily: "Helvetica",
    },
    subtitle2: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Helvetica",
    },
    redText: {
        color: "red",
        fontFamily: "Helvetica-Bold",
    },
    name: {
        fontSize: 32,
        padding: 10,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#DC2626",
        fontFamily: "Helvetica-Bold",
    },
    levelText: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Helvetica",
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        margin: 10,
        fontFamily: "Helvetica",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableHeader: {
        backgroundColor: "transparent",
        padding: 6,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
        fontSize: 8,
        border: "1 solid #000",
        fontFamily: "Helvetica-Bold",
    },
    tableCell: {
        padding: 5,
        textAlign: "center",
        flex: 1,
        border: "1 solid #000",
        fontFamily: "Helvetica-Bold",
        fontSize: 12,
    },
    semiFooter1: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "Helvetica-Bold",
    },
    semiFooter2: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 40,
        fontFamily: "Helvetica-Bold",
    },
    footer: {
        fontSize: 14,
        fontFamily: "Helvetica",
    },
    footerName: {
        fontSize: 20,
        fontFamily: "Helvetica-Bold",
    },
    footerAverage: {
        fontSize: 20,
        fontFamily: "Helvetica",
        marginTop: 20,
    },
    boldText:{
        fontFamily: "Helvetica-Bold",
    },


    //2nd Page Certificate

    pdfPageLandscape: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 10,
        width: '100%',
        fontFamily: "Helvetica",
    },
    assessmentTable: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    assessmentTableRow: {
        flexDirection: 'row',
    },
    assessmentTableCol: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        justifyContent: 'center',
    },
    headerCell: {
        backgroundColor: '#f0f0f0',
        fontFamily: "Helvetica-Bold",
    },
    colCriteriaAspect: {
        width: '12.5%',
    },
    colCriteriaDetails: {
        width: '12.5%',
    },
    colRating: {
        width: '15%',
    },
    colDescriptor: {
        width: '25%',
    },
    colAverageRating: {
        width: '15%',
    },
    colProficiency: {
        width: '20%',
    },
    assessmentTableCell: {
        fontSize: 8,
        textAlign: 'center',
    },
    highlightedHeader: {
        backgroundColor: '#E64046',
        color: 'white',
    },
    removeBorderBottom: {
        borderBottomWidth: 0
    },
    addBorderTop:{
        borderTopWidth: 1
    },
});



const LandscapeCertificate = ({
    name,
    cefr,
    scores = {},
    logo,
    data,
    monthYear,
    proficiencyLevel,
    full_department,
    evaluatorName,
    pronunciationLevel,
    grammarLevel,
    fluencyLevel,
    pronunciation_average,
    grammar_average,
    fluency_average,
    pronunciationData,
    grammarData,
    fluencyData,
    averageRating,
}) => {

    // Proficiency levels
    const epgfProficiencyLevels = [
        { threshold: 0.00, level: 'Beginning' },
        { threshold: 0.50, level: 'Low Acquisition' },
        { threshold: 0.75, level: 'High Acquisition' },
        { threshold: 1.00, level: 'Emerging' },
        { threshold: 1.25, level: 'Low Developing' },
        { threshold: 1.50, level: 'High Developing' },
        { threshold: 1.75, level: 'Low Proficient' },
        { threshold: 2.00, level: 'Proficient' },
        { threshold: 2.25, level: 'High Proficient' },
        { threshold: 2.50, level: 'Advanced' },
        { threshold: 3.00, level: 'High Advanced' },
        { threshold: 4.00, level: 'Native/Bilingual' },
    ];

    // Get proficiency level based on average rating
    const getProficiencyLevel = (epgfAverage) => {
        for (let i = 0; i < epgfProficiencyLevels.length; i++) {
            const current = epgfProficiencyLevels[i];
            const previous = epgfProficiencyLevels[i - 1];

            if (
                (previous ? epgfAverage > previous.threshold : true) &&
                epgfAverage <= current.threshold
            ) {
                return { level: current.level };
            }
        }
        return { level: 'Unknown' };
    };

    const result = getProficiencyLevel(averageRating);

    // Headers must match data keys!
    const headers = [
        { label: 'Low\nAcquisition', key: 'lowAcquisition', level: 'Low Acquisition' },
        { label: 'High\nAcquisition', key: 'highAcquisition', level: 'High Acquisition' },
        { label: 'Emerging', key: 'emerging', level: 'Emerging' },
        { label: 'Low\nDeveloping', key: 'lowDeveloping', level: 'Low Developing' },
        { label: 'High\nDeveloping', key: 'highDeveloping', level: 'High Developing' },
        { label: 'Low\nProficient', key: 'lowProficient', level: 'Low Proficient' },
        { label: 'Proficient', key: 'proficient', level: 'Proficient' },
        { label: 'High\nProficient', key: 'highProficient', level: 'High Proficient' },
        { label: 'Advanced', key: 'advanced', level: 'Advanced' },
        { label: 'High\nAdvanced', key: 'highAdvanced', level: 'High Advanced' },
        { label: 'Native or\nBilingual', key: 'nativeBilingual', level: 'Native/Bilingual' },
    ];

    return (

        <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
        {/* Background Image */}
        <Image src={backCert} style={styles.pageBackground} />

        {/* Logo */}
        <Image src={logo} style={styles.logo} />

        <Text style={styles.title}>English Communication Skills Certification</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle1}>{full_department}</Text>
        <Text style={styles.subtitle2}>
        is certified to have
        <Text style={styles.boldText}>{" "}the English Proficiency level of{" "}</Text>
        <Text style={styles.redText}>{proficiencyLevel}</Text>
        </Text>

        <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableRow}>
        {headers.map((header, i) => (
            <Text
            key={i}
            style={[
                styles.tableHeader,
                header.level === result.level && styles.highlightedHeader,
            ]}
            >
            {header.label}
            </Text>
        ))}
        </View>

        {/* Data */}
        <View style={styles.tableRow}>
        {headers.map((header, i) => {
            const value = data[0]?.[header.key] ?? '';
            const isMatched = header.level === result.level;

            // Format the value if it's a number
            const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;

            return (
                <Text
                key={i}
                style={[
                    styles.tableCell,
                    isMatched && styles.highlightedHeader,
                ]}
                >
                {formattedValue}
                </Text>
            );
        })}
        </View>
        </View>

        <Text style={styles.semiFooter1}>
        Approximately at CEFR (Common European Framework of Reference)
        <Text style={styles.redText}>{" "}{cefr}</Text>
        </Text>
        <Text style={styles.semiFooter2}>
        for Global Academic and Workplace Communication in
        <Text style={styles.redText}>{" "}{monthYear}</Text>
        </Text>
        <Text style={styles.footerName}>{evaluatorName}</Text>
        <Text style={styles.footer}>Evaluator</Text>
        </View>
        </Page>

        {/* 2nd Page */}

        <Page size="A4" orientation="landscape" style={styles.pdfPageLandscape}>
        <View style={styles.contentContainer}>
        <View style={styles.assessmentTable}>
        {/* Header Row */}
        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}>CRITERIA</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}>Rating</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}>Descriptor</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colAverageRating, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}>Average Rating</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colProficiency, styles.headerCell]}>
        <Text style={styles.assessmentTableCell}>Proficiency</Text>
        </View>
        </View>

        {/* Data Rows */}
        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Consistency</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.consistency_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.consistency_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Clarity</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.clarity_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.clarity_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}>
            <Text style={styles.boldText}>Pronunciation</Text>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Articulation</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.articulation_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.articulation_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}>
            {typeof pronunciation_average === 'number' ? pronunciation_average.toFixed(2) : pronunciation_average}
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}>
        {pronunciationLevel
            .split(' ') // Split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')}
        </Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Intonation and Stress</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.intonation_and_stress_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{pronunciationData.intonation_and_stress_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        </View>

        {/* Data Rows */}
        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect, styles.addBorderTop, styles.removeBorderBottom,]}>
        <Text style={styles.assessmentTableCell}>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Accuracy</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{grammarData.accuracy_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{grammarData.accuracy_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}>
        </Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect, styles.removeBorderBottom,]}>
        <Text style={styles.assessmentTableCell}>
                <Text style={styles.boldText}>Grammar</Text></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Clarity of Thought</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{grammarData.clarity_of_thought_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{grammarData.clarity_of_thought_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}>
                {typeof grammar_average === 'number' ? grammar_average.toFixed(2) : grammar_average}
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}>
        {grammarLevel
            .split(' ') // Split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')}
        </Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Syntax</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{grammarData.clarity_of_thought_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{grammarData.syntax_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect, styles.removeBorderBottom,]}>
        <Text style={styles.assessmentTableCell}>
        <Text style={styles.boldText}>Fluency</Text>
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Quality of Response</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{fluencyData.quality_of_response_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{fluencyData.quality_of_response_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colAverageRating, styles.removeBorderBottom]}>
        <Text style={styles.assessmentTableCell}>
        {typeof fluency_average === 'number' ? fluency_average.toFixed(2) : fluency_average}
        </Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.removeBorderBottom, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}>
        {fluencyLevel
            .split(' ') // Split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')}
        </Text>
        </View>
        </View>

        <View style={styles.assessmentTableRow}>
        <View style={[styles.assessmentTableCol, styles.colCriteriaAspect]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colCriteriaDetails]}>
        <Text style={styles.assessmentTableCell}>Detail of Response</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colRating]}>
        <Text style={styles.assessmentTableCell}>{fluencyData.detail_of_response_rating}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colDescriptor]}>
        <Text style={styles.assessmentTableCell}>{fluencyData.detail_of_response_descriptor}</Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colAverageRating]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        <View style={[styles.assessmentTableCol, styles.colProficiency]}>
        <Text style={styles.assessmentTableCell}></Text>
        </View>
        </View>
        </View>
        </View>
        </Page>
        </Document>
    );
};

export default LandscapeCertificate;
