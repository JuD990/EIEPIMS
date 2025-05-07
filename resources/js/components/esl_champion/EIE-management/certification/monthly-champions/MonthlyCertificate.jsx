import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import backCert from "@assets/champBackCert2.png";

// Fallback images
import defaultProfile from "@profilePics/default_logo.png";
import defaultDepartment from "@profileDept/default.png";

const getDepartmentLogo = async (department) => {
    try {
        const departmentLowerCase = department.toLowerCase();
        const logo = await import(`@profileDept/${departmentLowerCase}.png`).then((logo) => logo.default);
        return logo;
    } catch (error) {
        console.warn(`Logo for ${department} not found, using default logo. Error: ${error.message}`);
        return defaultDepartment;
    }
};

const getProfilePicture = async (studentId) => {
    try {
        const image = await import(`@profilePics/${studentId}.png`).then((image) => image.default);
        return image;
    } catch (error) {
        console.warn(`Profile picture for studentId: ${studentId} not found, using default.`);
        return defaultProfile; // Fallback to default if image not found
    }
};

const styles = StyleSheet.create({
    pageBackground: {
        position: 'absolute',
        right: 30,
        left: -20,
        top: -20,
        width: "108%",
        height: "105%",
        zIndex: -1,
    },
    imageBackground: {
        position: 'absolute',
        zIndex: -2,
        top: '12%',
        left: '5%',
        width: 100,
        height: 100,
        borderRadius: 75,
    },
    imageBackground2: {
        position: 'absolute',
        zIndex: -2,
        top: '12%',
        right: '5%',
        width: 105,
        height: 105,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'grey',
        borderStyle: 'solid',
        objectFit: 'cover',
    },
    container: {
        flexGrow: 1,
        position: "relative",
        zIndex: 1,
    },
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
    bottomNames1: {
        fontSize: 12,
        textTransform: "uppercase",
        fontFamily: "Helvetica-Bold"
    },
    text: {
        fontSize: 18,
        fontFamily: "Helvetica",
    },
    specificText1: {
        margin: 10,
        fontSize: 14,
        marginTop: 200,
    },
    specificText2: {
        margin: 10,
        fontSize: 14,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 100,
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
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

// Certificate Component
const Certificate = (props) => {
    const {
        name = "N/A",
        yearLevel = "N/A",
        department = "N/A",
        fullDepartment = 'N/A',
        deanName = "N/A",
        month = "N/A",
        currentYear = "N/A",
        nextYear = "N/A",
        eslChampion = "N/A",
        studentId = "N/A",
    } = props;

    const departmentLogo = getDepartmentLogo(department);
    const profilePicture = getProfilePicture(studentId);

    return (
        <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.container}>
        {/* Background image */}
        <Image src={backCert} style={styles.pageBackground} />

        {/* Logos in the background */}
        <Image src={departmentLogo} style={styles.imageBackground} />

        <Text style={styles.specificText1}>This</Text>
        <Text style={styles.secondTitle}>Certificate of Recognition</Text>
        <Text style={styles.specificText2}>is awarded to</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>
        as the <Text style={styles.bestText}>Best in Communication and Presentation</Text>
        </Text>
        <Text style={styles.text}>
        among all the students in {yearLevel} for the
        </Text>
        <Text style={styles.text}>
        English Immersive Environment SPARK Program
        </Text>
        <Text style={styles.text}>
        of the University of Nueva Caceres in the
        </Text>
        <Text style={styles.text}>
        {fullDepartment}
        </Text>
        <Text style={styles.text}>
        for {month} in School Year {currentYear}-{nextYear}
        </Text>

        {/* Row for MIA TIJAM and Dean */}
        <View style={styles.rowContainer}>
        <View style={styles.column}>
        <Text style={styles.bottomNames}>{eslChampion.toUpperCase()}</Text>
        <Text style={{fontSize: "12"}}>Director-ESL Champion</Text>
        <Text style={{fontSize: "12"}}>English Immersive Environment</Text>
        </View>
        <View style={styles.column}>
        <Text style={styles.bottomNames}>{deanName.toUpperCase()}</Text>
        <Text style={{ fontSize: "12" }}>Dean</Text>
        <Text style={{ fontSize: "12" }}>{fullDepartment}</Text>
        </View>
        </View>

        {/* Bottom Section*/}
        <View style={styles.bottomContainer}>
        <Text>
        <Text style={styles.bottomNames1}>ROMEO M. SUMAYO,</Text>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: "12" }}> Jr., Ph.D.</Text>
        </Text>
        <Text style={{ fontSize: "12" }}>Vice President for Academic Affairs</Text>
        </View>
        </View>
        </Page>
        </Document>
    );
};

export default Certificate;
