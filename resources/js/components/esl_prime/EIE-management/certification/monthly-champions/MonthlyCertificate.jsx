import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Times-Roman",
    fonts: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Times-Roman.ttf" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Times-Bold.ttf", fontWeight: "bold" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Times-Italic.ttf", fontStyle: "italic" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Times-BoldItalic.ttf", fontWeight: "bold", fontStyle: "italic" }
    ]
});

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        textAlign: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "Helvetica-Bold",
        marginTop: 20,
        marginBottom: 40,
    },
    secondTitle: {
        fontSize: 28,
        fontFamily: "Times-BoldItalic"
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 15,
        textTransform: "uppercase",
        color: "red",
        fontFamily: "Helvetica-Bold"
    },
    bottomNames: {
        fontSize: 12,
        textTransform: "uppercase",
        fontFamily: "Helvetica-Bold"
    },
    text: {
        fontSize: 18,
    },
    specificText: {
        margin: 10,
        fontSize: 14,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 120,
    },
    column: {
        textAlign: "center",
        width: "50%",
    },
    bottomContainer: {
        marginTop: 40,
        textAlign: "center",
    },
    bottomText: {
        fontSize: 14,
        marginBottom: 10,
        marginTop: 50,
    },
    bestText: {
        fontFamily: "Helvetica-BoldOblique",
    },

});

// Certificate Component
const Certificate = (props) => {
    console.log("📝 Certificate Component Props:", props);

    const {
        name = "N/A",
        yearLevel = "N/A",
        department = "N/A",
        deanName = "N/A",
        month = "N/A",
        currentYear = "N/A",
        nextYear = "N/A",
        eslChampion = "N/A",
    } = props;

    return (
        <Document>
        <Page size="A4" style={styles.page}>
        <Text style={styles.title}>EIE Spark Champion</Text>
        <Text style={styles.specificText}>This</Text>
        <Text style={styles.secondTitle}>Certificate of Recognition</Text>
        <Text style={styles.specificText}>is awarded to</Text>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.text}>
        as the <Text style={styles.bestText}>Best in Communication and Presentation</Text>
        </Text>
        <Text style={styles.text}>
        among all the students in {yearLevel}
        </Text>
        <Text style={styles.text}>
        for the English Immersive Environment SPARK Program
            </Text>
            <Text style={styles.text}>
            of the University of Nueva Caceres in the {department}
            </Text>
            <Text style={styles.text}>
            for {month} in School Year {currentYear}/{nextYear}
            </Text>

        {/* Row for MIA TIJAM and Dean */}
        <View style={styles.rowContainer}>
        <View style={styles.column}>
        <Text style={styles.bottomNames}>{eslChampion.toUpperCase()}</Text>
        <Text style={{fontSize: "12"}}>Director-ESL Champion</Text>
        <Text style={{fontSize: "12"}}>English Immersive Environment</Text>
        </View>
        <View style={styles.column}>
        <Text style={styles.bottomNames}>{deanName.toUpperCase()}, MIS</Text>
        <Text style={{ marginBottom: 15, fontSize: "12" }}>Dean, {department}</Text>
        </View>
        </View>

        {/* Bottom Section*/}
        <View style={styles.bottomContainer}>
        <Text>
        <Text style={styles.bottomNames}>ROMEO M. SUMAYO,</Text>
        <Text style={{ fontFamily: "Times-Bold", fontSize: "12" }}> Jr., Ph.D.</Text>
        </Text>
        <Text style={{fontSize: "12"}}>Vice President for Academic Affairs</Text>
        </View>
        </Page>
        </Document>
    );
};


export default Certificate;
