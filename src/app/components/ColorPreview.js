import { useEffect } from 'react';

const ColorPreview = () => {
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
                case 'idea':
                    previewDiv.style.backgroundColor = '#277da1';
                break;
                case 'note':
                    previewDiv.style.backgroundColor = '#edf2f4';
                break;
                case 'reminder':
                    previewDiv.style.backgroundColor = '#8ecae6';
                break;
                default:
                    previewDiv.style.backgroundColor = '#5a189a';
                break;                              
            }
        });

        return () => {
            selectElement.removeEventListener('change', handleSelectChange);
        };
    }, []);

    return (
        <div id='select-color-preview-container'>
            <div id='select-color-preview'></div>
        </div>
    );
}

export default ColorPreview;
