import { useEffect } from 'react';

function ColorPreview() {
    useEffect(() => {

        const selectElement = document.getElementById('importance-selector');
        const previewDiv = document.getElementById('select-color-preview');

        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;

            switch (selectedValue) {
                case 'low':
                    previewDiv.style.backgroundColor = '#90be6d';
                break;
                case 'medium':
                    previewDiv.style.backgroundColor = '#f9c74f';
                break;
                case 'high':
                    previewDiv.style.backgroundColor = '#f9844a';
                break;
                case 'critical':
                    previewDiv.style.backgroundColor = '#f94144';
                break;
                default:
                    previewDiv.style.backgroundColor = '';
                break;
            }
        });

        return () => {
            selectElement.removeEventListener('change', handleSelectChange);
        };
    }, []); // Empty dependency array ensures this effect runs only once after mounting

    return (
        <div id='select-color-preview'>
            {/* Your JSX/HTML code here */}
        </div>
    );
}

export default ColorPreview;
